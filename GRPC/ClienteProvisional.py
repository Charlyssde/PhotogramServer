import grpc
import Chat_pb2_grpc as str_grpc
import Chat_pb2 as structure


def main():
    host = 'localhost'
    port = 1337

    with open('serverchat.csr', 'rb') as f:
        trusted_certs = f.read()

    credentials = grpc.ssl_channel_credentials(root_certificates=trusted_certs)
    channel = grpc.secure_channel('{}:{}'.format(host, port), credentials)

    stub = str_grpc.ChatStub(channel)
    stub.recibirMensajes(structure.Empty())

    print('Done')

if __name__ == '__main__':
    main()