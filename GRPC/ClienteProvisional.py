import grpc
import Chat_pb2_grpc as str_grpc
import Chat_pb2 as structure
import threading
import datetime
host = 'localhost'
port = 50051
channel = grpc.insecure_channel(host + ':' + str(port))
stub = str_grpc.ChatStub(channel)
sender =  "Uno mas"
def main():
    ##stub = str_grpc.ChatStub(channel)
    receiver = "Charly"
    msj = structure.Mensaje(sender = sender, content = "Message 4 test", receiver = receiver)
    response = stub.enviarMensaje(msj)
    print(response)
    threading.Thread(target=getMessages(), daemon=True, args={}).start()

def getMessages():
    for x in stub.recibirMensajes( structure.Usuario(username = sender)):
        print(x)

if __name__ == '__main__':
    main()