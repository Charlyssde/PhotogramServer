import grpc
import Chat_pb2 as structure
import Chat_pb2_grpc as str_grpc
from concurrent import futures

class ChatServer(str_grpc.ChatServicer):
    def __init__(self, *args, **kwargs):
        self.conversaciones = list()

    def abrirConversacion(self, request):
        if request.key not in self.conversaciones:
            print()
    
    def recibirMensajes(self, request, context):
        while True:
            print()
    
    def enviarMensaje(self, request_iterator, context):
        while True:
            print()


def main():
    port = '1337'

    with open('serverchat.key', 'rb') as f:
        private_key = f.read()
    with open('serverchat.csr', 'rb') as f:
        certificate_chain = f.read()

    server_credentials = grpc.ssl_server_credentials(
      ((private_key, certificate_chain,),))

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=100))
    str_grpc.add_ChatServicer_to_server(ChatServer(), server)

    print('Servidor iniciado')
    server.add_secure_port('[::]:'+port, server_credentials)

    server.start()
    
    server.wait_for_termination()

if __name__ == '__main__':
    main()