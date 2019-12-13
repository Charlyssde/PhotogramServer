import mysql.connector
import grpc
import Chat_pb2 as structure
import Chat_pb2_grpc as str_grpc
from concurrent import futures
import time
import datetime

cnx = mysql.connector.connect(user='root', password='2580',host='localhost',database='photogram')

class ChatServer(str_grpc.ChatServicer):
    def __init__(self, *args, **kwargs):
        self.usuarios = list()
        self.messages = list()


        #Se cargan los mensajes de la bd
        cur = cnx.cursor()
        cur.execute("SELECT * FROM photogram.mensaje")
        for msj in cur.fetchall():
            print(msj)
            self.messages.append(msj)

    def recibirMensajes(self, request, context):
        cont = 0
        while True:
            while cont < len(self.messages):
                message = structure.Mensaje(
                    id = self.messages[cont][0], sender = self.messages[cont][1], receiver = self.messages[cont][2], content = self.messages[cont][3])
                if request.username == message.receiver:
                    yield message
                    cont = cont + 1
    
    def enviarMensaje(self, request, context):
        cur = cnx.cursor()
        sender = request.sender
        receiver = request.receiver
        contenido = request.content
        date = datetime.datetime.now()
        query = "INSERT INTO photogram.mensaje (sender, receiver, content, date) values (%s,%s,%s,%s)" 
        values = (sender, receiver, contenido, date)
        cur.execute(query, values)
        cnx.commit()
        #insertarlo en la bd
        
        self.messages.clear()
        cur.execute("SELECT * FROM photogram.mensaje")
        for msj in cur.fetchall():
            print(msj)
            self.messages.append(msj)
        return structure.Empty(response = "success")


def main():
    port = '1337'

    with open('serverchat.key', 'rb') as f:
        private_key = f.read()
    with open('serverchat.crt', 'rb') as f:
        certificate_chain = f.read()

    server_credentials = grpc.ssl_server_credentials(
      ((private_key, certificate_chain),))

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=100))
    str_grpc.add_ChatServicer_to_server(ChatServer(), server)

    print('Servidor iniciado')
    server.add_secure_port('[::]:'+port, server_credentials)
    server.start()
    
    try:
        while True:
            time.sleep(60 * 60 * 24)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    main()