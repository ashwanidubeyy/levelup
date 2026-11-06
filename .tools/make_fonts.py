import sys, os, shutil
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'py'))
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

SRC = os.path.join(os.path.dirname(__file__), 'fonts')
OUT = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'fonts')
os.makedirs(OUT, exist_ok=True)

def rename(font, family, style, ps):
    name = font['name']
    for rec in list(name.names):
        if rec.nameID in (1, 2, 3, 4, 6, 16, 17, 21, 22):
            name.removeNames(nameID=rec.nameID)
    full = f'{family} {style}'
    for pid, eid, lid in ((3, 1, 0x409), (1, 0, 0)):
        name.setName(ps, 1, pid, eid, lid)
        name.setName('Regular', 2, pid, eid, lid)
        name.setName(f'{ps};LevelUp', 3, pid, eid, lid)
        name.setName(ps, 4, pid, eid, lid)
        name.setName(ps, 6, pid, eid, lid)
    if 'OS/2' in font:
        font['OS/2'].fsSelection = (font['OS/2'].fsSelection & ~0b1100001) | 0b1000000
        font['OS/2'].usWeightClass = 400
    if 'head' in font:
        font['head'].macStyle = 0

for weight, style in ((500, 'Medium'), (700, 'Bold'), (900, 'Black')):
    f = TTFont(os.path.join(SRC, 'Orbitron%5Bwght%5D.ttf'))
    inst = instantiateVariableFont(f, {'wght': weight})
    ps = f'Orbitron-{style}'
    rename(inst, 'Orbitron', style, ps)
    inst.save(os.path.join(OUT, f'{ps}.ttf'))

for style in ('Regular', 'Medium', 'SemiBold', 'Bold'):
    f = TTFont(os.path.join(SRC, f'Rajdhani-{style}.ttf'))
    ps = f'Rajdhani-{style}'
    rename(f, 'Rajdhani', style, ps)
    f.save(os.path.join(OUT, f'{ps}.ttf'))

for fn in sorted(os.listdir(OUT)):
    t = TTFont(os.path.join(OUT, fn))
    print(fn, t['name'].getDebugName(6), t['name'].getDebugName(1))
