# BATTN — marcador offline (TypeScript / Expo)

App completo para marcar **Plodar Battn** na mesa: Orbi, Critici, posta, vazas, X dos 19, desfazer, soma e revanche.

## Quando chegar em casa (iPhone + Expo Go)

Com SDK 57 o Expo Go **exige login na mesma conta** no PC e no iPhone.

### 1) Login (obrigatório)

No PC:
```bash
cd battn-score
npm install
npx expo login
```

No iPhone: abra **Expo Go** → ícone do avatar (canto) → entre na **mesma conta**.

### 2) Subir o app (preferência: SEM tunnel)

Se PC e iPhone estão no **mesmo Wi‑Fi** ou o PC está no **hotspot do iPhone**:

```bash
npx expo start
```

Não use `--tunnel` a menos que precise. O tunnel (ngrok) às vezes quebra com:
`TypeError: Cannot read properties of undefined (reading 'body')`.

#### Se precisar de tunnel e der erro de ngrok

1. Instale local (já está no projeto): `@expo/ngrok`
2. Se ainda falhar, use LAN + hotspot, ou web:

```bash
npx expo start --web
```

Abra o link no Safari do iPhone (mesma rede).

### Se aparecer “porta em uso”

Aceite outra porta (8082) ou mate o Expo antigo e rode de novo.

### 3) Abrir no iPhone

- Preferência: dentro do **Expo Go** → Scan QR (não só a Câmera do sistema)
- Ou toque no servidor que aparece na Home do Expo Go (depois do login)
- Se o QR falhar: copie a URL `exp://...` do terminal e cole em Expo Go → “Enter URL”

### Se ainda der erro

| Sintoma | O que fazer |
|---|---|
| “must login” / não abre | `npx expo logout` depois `npx expo login`; relogue no Expo Go |
| QR abre e falha de conexão | `npm run start:tunnel` + mesmo hotspot/Wi‑Fi |
| Erro estranho / 500 | `npx expo start --offline` |
| Só quer ver a cara | `npx expo start --web` e abra no Safari do Mac/PC |

**Cabo USB:** no iPhone com Expo Go **não** substitui a rede. Precisa tunnel/LAN (ou build nativo no Xcode, que precisa Mac).

## O que já está pronto

- Turno normal / Começar Orbi (com quem chamou)
- Posta +1 e atalhos 3 / 4 / 5
- Orbi recusado (+2)
- Contador de **vazas** (até 3) por dupla
- Marcar quem ganhou / desistência (regra do X)
- ±1 no placar + **apagar último**
- **Soma** total no centro
- Badge **X · 19** e vitória aos 21
- **Revanche** com os mesmos nomes
- Aba Critici rápida + regras completas + como jogar + créditos
- Salva a partida no aparelho (offline)
- Tela não apaga durante o jogo (keep-awake)
- Vibração leve nos toques (iPhone)

## Em casa: só aperfeiçoar

Ideias pra depois: ícone custom, nomes favoritos, modo paisagem “mesa”, compartilhar placar, build EAS instalável sem Expo Go.

## Nota

Homenagem ao Battn / Le Sappadine — app independente, sem afiliação oficial.
