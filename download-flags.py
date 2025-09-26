#!/usr/bin/env python3
import os
import requests
import time

# Zoznam krajín a ich kódov
flags = {
    'sk': 'Slovakia',
    'cz': 'Czech Republic',
    'gb': 'United Kingdom',
    'de': 'Germany',
    'jp': 'Japan',
    'cn': 'China',
    'in': 'India',
    'tr': 'Turkey',
    'ru': 'Russia',
    'fr': 'France',
    'es': 'Spain',
    'it': 'Italy',
    'nl': 'Netherlands',
    'pt': 'Portugal',
    'sa': 'Saudi Arabia',
    'kr': 'South Korea',
    'hu': 'Hungary',
    'gr': 'Greece',
    'no': 'Norway',
    'fi': 'Finland',
    'dk': 'Denmark',
    'se': 'Sweden'
}

# Vytvorenie priečinka pre vlajky
flags_dir = 'assets/flags'
os.makedirs(flags_dir, exist_ok=True)

# Stiahnutie vlajok
for code, country in flags.items():
    url = f'https://flagcdn.com/w80/{code}.png'
    print(f'Sťahujem vlajku pre {country} ({code})...')
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(f'{flags_dir}/{code}.png', 'wb') as f:
                f.write(response.content)
            print(f'Vlajka pre {country} bola úspešne stiahnutá.')
        else:
            print(f'Nepodarilo sa stiahnuť vlajku pre {country}. Stavový kód: {response.status_code}')
        
        # Pauza medzi požiadavkami
        time.sleep(0.5)
    except Exception as e:
        print(f'Chyba pri sťahovaní vlajky pre {country}: {e}')

print('Sťahovanie vlajok dokončené.')