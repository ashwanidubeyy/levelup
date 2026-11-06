import sys, os, shutil
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'py'))
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..')
SRC = os.path.join(ROOT, 'assets')
OUT = os.path.join(ROOT, 'src', 'assets', 'Images', 'anime')
os.makedirs(OUT, exist_ok=True)

MAP = {
    'wp15699802-solo-leveling-hd-4k-wallpapers.jpg': 'solo_leveling_01',
    'wp15238958-naruto-anime-mobile-wallpapers.webp': 'naruto_01',
    'wp15262889-naruto-anime-mobile-wallpapers.jpg': 'naruto_02',
    'wp13788587-itachi-hd-mobile-wallpapers.jpg': 'itachi_01',
    'wp14650621-zoro-mobile-hd-wallpapers.jpg': 'zoro_01',
    'wp14809787-zoro-mobile-hd-wallpapers.jpg': 'zoro_02',
    'wp16516179-zoro-mobile-hd-wallpapers.jpg': 'zoro_03',
    'wp2832411-one-piece-mobile-wallpaper.jpg': 'one_piece_01',
    'wp4451844-luffy-supreme-wallpapers.jpg': 'one_piece_02',
    'wp4855635-monkey-d-luffy-iphone-wallpapers.jpg': 'one_piece_03',
    'wp4855642-monkey-d-luffy-iphone-wallpapers.jpg': 'one_piece_04',
    'wp4855645-one-piece-mobile-4k-wallpapers.jpg': 'one_piece_05',
    'wp6673791-one-piece-mobile-4k-wallpapers.jpg': 'one_piece_06',
    'wp9358075-one-piece-mobile-4k-wallpapers.jpg': 'one_piece_07',
    'wp2690420-goku-mobile-wallpapers.png': 'goku_01',
    'wp4616636-goku-mobile-wallpapers.jpg': 'goku_02',
    'wp5354202-goku-mobile-wallpapers.jpg': 'goku_03',
}

MAX_EDGE = 1600

def save(img, name, max_edge=MAX_EDGE):
    img = img.convert('RGB')
    w, h = img.size
    scale = min(1.0, max_edge / max(w, h))
    if scale < 1.0:
        img = img.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    path = os.path.join(OUT, f'{name}.webp')
    img.save(path, 'WEBP', quality=80, method=6)
    print(f'{name}.webp', img.size, os.path.getsize(path) // 1024, 'KB')

for src, name in MAP.items():
    save(Image.open(os.path.join(SRC, src)), name)

sasuke = Image.open(os.path.join(SRC, 'uwp5058968.jpeg'))
w, h = sasuke.size
cw = round(h * 9 / 16)
left = (w - cw) // 2
save(sasuke.crop((left, 0, left + cw, h)), 'sasuke_01')
save(sasuke, 'sasuke_wide', 1280)

shutil.copyfile(os.path.join(ROOT, 'loader.gif'), os.path.join(ROOT, 'src', 'assets', 'Images', 'loader.gif'))
print('loader.gif copied')
