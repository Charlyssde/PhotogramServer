import unittest
import Server
from concurrent import futures

import grpc
import Chat_pb2_grpc as str_grpc
import Chat_pb2 as structure
import threading
import datetime


class TestServer(unittest.TestCase):
    port = '1337'
    host = 'localhost'
    channel = grpc.insecure_channel(host + ':' + port)  
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=100))
    def setUp(self):
        
        str_grpc.add_ChatServicer_to_server(Server.ChatServer(), self.server)
        print('Servidor iniciado')
        self.server.add_insecure_port('localhost:' + self.port)
        self.server.start()
    
    def tearDown(self):
        self.server.stop(None)
    #Casos prueba
    def test_enviarMensajes(self):
        stub = str_grpc.ChatStub(self.channel)
        msg = structure.Mensaje(sender = 'testsender', content = "this is a test", receiver= 'testreceiver')
        
        self.assertEqual("success", stub.enviarMensaje(msg))

    def test_recibirMensajes(self):
       with grpc.insecure_channel("localhost:" + self.port) as channel:
            stub = str_grpc.ChatStub(channel)
            response = stub.recibirMensajes(structure.Usuario(username = "testreceiver"))
            self.assertEqual(response)
    
    

def main():
    suite = unittest.TestLoader().loadTestsFromTestCase(TestServer)
    unittest.TextTestRunner(verbosity=3).run(suite)


main()

