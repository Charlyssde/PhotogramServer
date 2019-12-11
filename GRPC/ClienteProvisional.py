import grpc
import Chat_pb2_grpc as str_grpc
import Chat_pb2 as structure
import threading
import datetime
host = 'localhost'
port = 50051
channel = grpc.insecure_channel(host + ':' + str(port))
stub = str_grpc.ChatStub(channel)
sender = structure.Usuario(username = "IDK")
def main():
    ##stub = str_grpc.ChatStub(channel)
    receiver = structure.Usuario(username = "IDK")
    msj = structure.Mensaje(id = "id", sender = sender, content = "idk", receiver = receiver)
    response = stub.enviarMensaje(msj)
    print(response)
    #threading.Thread(target=getMessages(), daemon=True, args={}).start()

def getMessages():
    for x in stub.recibirMensajes(sender):
        print(x)

if __name__ == '__main__':
    main()