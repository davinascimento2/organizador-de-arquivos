# Organizador de Arquivos

![img](https://via.placeholder.com/600x200.png?text=Organizador+de+Arquivos)

## Introdução
Este projeto tem como objetivo desenvolver um organizador de arquivos simples que permite classificar e mover arquivos para pastas específicas com base em suas extensões. O projeto pode ser expandido para incluir mais recursos, como a limpeza de arquivos antigos e a integração com serviços de armazenamento em nuvem.

## Funcionalidades
- Organizar arquivos em pastas baseadas em suas extensões.
- Mover arquivos de um diretório de origem para um diretório de destino.
- Suporte para múltiplas extensões de arquivos.

## Materiais utilizados
- Linguagem de programação: Python
- Biblioteca: os, shutil

## Tecnologias utilizadas
- Python 3.x
- Ambiente virtual (opcional)

## Fluxo do projeto

1. Definir os diretórios de origem e destino.
2. Listar todos os arquivos no diretório de origem.
3. Para cada arquivo, verificar sua extensão.
4. Mover o arquivo para a pasta correspondente no diretório de destino.

## Como utilizar o projeto

1. Clonar o repositório:
   ```bash
   git clone https://github.com/seuusuario/organizador-arquivos.git
Navegar até o diretório do projeto:

bash
cd organizador-arquivos
Instalar as dependências, se houver:

bash
pip install -r requirements.txt
Executar o script:

bash
python organizador.py

Código do projeto

python
import os
import shutil

def organizar_arquivos(diretorio_origem, diretorio_destino):
    extensoes = {
        'imagens': ['.jpg', '.jpeg', '.png', '.gif'],
        'documentos': ['.pdf', '.docx', '.txt'],
        'musicas': ['.mp3', '.wav'],
        'videos': ['.mp4', '.mov'],
        # Adicione mais categorias conforme necessário
    }

    for arquivo in os.listdir(diretorio_origem):
        nome, extensao = os.path.splitext(arquivo)
        for pasta, exts in extensoes.items():
            if extensao.lower() in exts:
                destino = os.path.join(diretorio_destino, pasta)
                os.makedirs(destino, exist_ok=True)
                shutil.move(os.path.join(diretorio_origem, arquivo), os.path.join(destino, arquivo))
                print(f'Movido: {arquivo} para {destino}')
                break

if __name__ == "__main__":
    origem = input("Digite o diretório de origem: ")
    destino = input("Digite o diretório de destino: ")
    organizar_arquivos(origem, destino)
Conclusão
Esse projeto fornece uma base simples para organizar arquivos automaticamente. O usuário pode expandir a funcionalidade, como adicionar uma interface gráfica ou implementar uma função de pesquisa de arquivos.



