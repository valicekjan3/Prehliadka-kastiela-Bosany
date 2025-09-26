#!/usr/bin/env python3
from PIL import Image
import os

# Vytvorenie priečinka pre ikony
icons_dir = 'assets'
os.makedirs(icons_dir, exist_ok=True)

# Vytvorenie ikony z prvého obrázka
try:
    # Použijeme prvý obrázok ako základ pre ikonu
    source_image_path = 'img/Snimka_1.PNG'
    
    if os.path.exists(source_image_path):
        img = Image.open(source_image_path)
        
        # Vytvorenie ikon rôznych veľkostí
        sizes = [16, 32, 48, 72, 96, 144, 192, 512]
        
        for size in sizes:
            resized_img = img.resize((size, size), Image.LANCZOS)
            
            # Uloženie ikony
            if size == 192:
                resized_img.save(f'{icons_dir}/icon-192x192.png')
                print(f'Ikona 192x192 bola vytvorená.')
            elif size == 512:
                resized_img.save(f'{icons_dir}/icon-512x512.png')
                print(f'Ikona 512x512 bola vytvorená.')
            
            # Vytvorenie favicon.ico
            if size == 16:
                favicon = resized_img.copy()
                favicon.save(f'{icons_dir}/favicon.ico', format='ICO')
                print('Favicon bola vytvorená.')
        
        print('Vytváranie ikon dokončené.')
    else:
        print(f'Zdrojový obrázok {source_image_path} nebol nájdený.')
except Exception as e:
    print(f'Chyba pri vytváraní ikon: {e}')