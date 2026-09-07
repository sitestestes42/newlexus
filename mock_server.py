from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import json, os
os.chdir('/mnt/data/lexus-nexus-style')
CAT={"id":"inow-1000w","name":"Bicicleta Elétrica INOW 1000W","shortName":"INOW 1000W","description":"Motor de 1000 W, bateria 48 V / 15,6 Ah e configuração urbana com aro 20 para deslocamentos práticos no dia a dia.","originalPriceCents":669999,"promotionalPriceCents":359990,"maxQuantity":10,"variants":[{"name":"Preto","swatch":"#171814","images":[{"src":"https://i.postimg.cc/26s1r0F3/inow-preta.png","alt":"Bicicleta elétrica INOW 1000W na cor preta"}]},{"name":"Caramelo","swatch":"#b37a45","images":[{"src":"https://i.postimg.cc/QMM9b9dX/inow-caramelo-2.webp","alt":"Bicicleta elétrica INOW 1000W na cor caramelo"},{"src":"https://i.postimg.cc/QxRTjxmT/inow-caramelo.webp","alt":"Bicicleta elétrica INOW 1000W caramelo, vista adicional"}]}],"specifications":[{"label":"Motor","value":"1000 W"},{"label":"Velocidade máxima","value":"45 km/h"},{"label":"Bateria","value":"48 V / 15,6 Ah"},{"label":"Aro","value":"20\""},{"label":"Capacidade","value":"até 200 kg"}]}
class H(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/api/catalog'):
            b=json.dumps(CAT).encode();self.send_response(200);self.send_header('Content-Type','application/json');self.send_header('Content-Length',len(b));self.end_headers();self.wfile.write(b);return
        if self.path.startswith('/api/auth/me'):
            b=b'{"user":null}';self.send_response(200);self.send_header('Content-Type','application/json');self.send_header('Content-Length',len(b));self.end_headers();self.wfile.write(b);return
        path=self.path.split('?')[0]
        if path!='/' and '.' not in path.rsplit('/',1)[-1]:
            f=path.strip('/')+'.html'
            if os.path.exists(f): self.path='/'+f
        return super().do_GET()
ThreadingHTTPServer(('127.0.0.1',8765),H).serve_forever()
