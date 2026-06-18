from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

# Carrega variáveis do arquivo .env (se existir)
load_dotenv()

app = Flask(__name__, static_folder='static', static_url_path='/static')

# Configurações para envio de e-mail (opcional - descomente se quiser usar)
# app.config['MAIL_SERVER'] = 'smtp.gmail.com'
# app.config['MAIL_PORT'] = 587
# app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USERNAME'] = os.getenv('EMAIL_USER', 'seuemail@gmail.com')
# app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASS', 'suasenha')
# app.config['MAIL_DEFAULT_SENDER'] = os.getenv('EMAIL_USER', 'seuemail@gmail.com')

# mail = Mail(app)

@app.route('/')
def home():
    """Página inicial do site"""
    return render_template('index.html')

@app.route('/enviar-contato', methods=['POST'])
def enviar_contato():
    """Processa o formulário de contato"""
    try:
        nome = request.form.get('nome')
        email = request.form.get('email')
        telefone = request.form.get('telefone')
        mensagem = request.form.get('mensagem')
        
        # Validação básica
        if not nome or not email or not mensagem:
            return jsonify({'erro': 'Preencha todos os campos obrigatórios'}), 400
        
        # Envia e-mail (opcional - descomente se quiser usar)
        # msg = Message('Novo contato do site Noxy',
        #               recipients=['noxydigital@gmail.com'])
        # msg.body = f"""
        # Nome: {nome}
        # E-mail: {email}
        # Telefone: {telefone or 'Não informado'}
        # 
        # Mensagem:
        # {mensagem}
        # """
        # mail.send(msg)
        
        return jsonify({'sucesso': 'Mensagem enviada! Entraremos em contato em breve.'}), 200
        
    except Exception as e:
        return jsonify({'erro': 'Erro ao enviar mensagem. Tente novamente.'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000, debug=True)