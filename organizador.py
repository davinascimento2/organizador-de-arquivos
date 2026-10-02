"""
SortFlow - Automated File Organizer & Directory Sorter (Python CLI)
Author: Davi Nascimento
"""

import os
import shutil
import sys
from pathlib import Path

EXTENSION_MAP = {
    "Documentos": [".pdf", ".docx", ".doc", ".txt", ".xlsx", ".pptx", ".csv", ".md"],
    "Imagens": [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp", ".bmp", ".ico"],
    "Audio": [".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a"],
    "Videos": [".mp4", ".mkv", ".mov", ".avi", ".webm"],
    "Compactados": [".zip", ".rar", ".7z", ".tar", ".gz"],
    "Codigo": [".py", ".js", ".ts", ".html", ".css", ".json", ".sql", ".cpp", ".c", ".rs"],
    "Executaveis": [".exe", ".msi", ".dmg", ".pkg", ".deb"]
}

def obter_categoria(extensao):
    ext = extensao.lower()
    for categoria, extensoes in EXTENSION_MAP.items():
        if ext in extensoes:
            return categoria
    return "Outros"

def organizar_diretorio(diretorio_origem, dry_run=False):
    caminho = Path(diretorio_origem)
    if not caminho.exists() or not caminho.is_dir():
        print(f"[!] Erro: Diretório '{diretorio_origem}' não encontrado.")
        return

    print(f"\n[+] Iniciando organização em: {caminho.resolve()}")
    if dry_run:
        print("[*] MODO DE SIMULAÇÃO (DRY RUN): Nenhum arquivo será movido.")

    movidos = 0
    ignorados = 0

    for item in caminho.iterdir():
        # Ignora diretórios existentes para não criar recursão infinita
        if item.is_dir() or item.name.startswith('.'):
            ignorados += 1
            continue

        ext = item.suffix
        categoria = obter_categoria(ext)
        pasta_destino = caminho / categoria

        if not dry_run:
            pasta_destino.mkdir(exist_ok=True)
            shutil.move(str(item), str(pasta_destino / item.name))

        print(f" -> {item.name:<35} => {categoria}/")
        movidos += 1

    print("\n" + "="*50)
    print(f"[✓] Concluído! {movidos} arquivos organizados, {ignorados} pastas preservadas.")
    print("="*50 + "\n")

if __name__ == "__main__":
    pasta = sys.argv[1] if len(sys.argv) > 1 else "."
    dry = "--dry-run" in sys.argv
    organizar_diretorio(pasta, dry_run=dry)
