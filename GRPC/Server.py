import mysql.connector
import grpc
import Chat_pb2 as structure
import Chat_pb2_grpc as str_grpc
from concurrent import futures
import time

cnx = mysql.connector.connect(user='root', password='2580',host='localhost',database='photogram')

class ChatServer(str_grpc.ChatServicer):
    def __init__(self, *args, **kwargs):
        #cargar las conversaciones desde la bd o registro
        self.usuarios = list()
        self.messages = list()

    def recibirMensajes(self, request, context):
        cont = 0
        while True:
            while cont < len(self.messages):
                if request.username == self.messages[cont].receiver.username:
                    yield self.messages[cont]
                    cont = cont + 1
    
    def enviarMensaje(self, request, context):
        self.messages.append(request)
        print(self.messages)
        return structure.Empty(response = "success")


def main():
    port = '1337'

    #with open('serverchat.key', 'rb') as f:
    #    private_key = f.read()
    #with open('serverchat.csr', 'rb') as f:
    #    certificate_chain = f.read()

    #server_credentials = grpc.ssl_server_credentials(
    #  ((private_key, certificate_chain,),))

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=100))
    str_grpc.add_ChatServicer_to_server(ChatServer(), server)

    print('Servidor iniciado')
    #server.add_insecure_port('localhost:' + str(port))
    #server.add_secure_port('[::]:'+port, server_credentials)
    server.add_insecure_port('[::]:50051')
    server.start()
    
    try:
        while True:
            time.sleep(60 * 60 * 24)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    main()