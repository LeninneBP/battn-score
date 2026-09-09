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

## Instalar de verdade no iPhone (Mac + Xcode, Apple ID grátis)

Assim o app fica instalado como qualquer outro, abre offline e não depende do PC.
Não precisa pagar os US$ 99: o Xcode assina com o **Personal Team** do seu Apple ID.
A assinatura grátis **expira em 7 dias** (é só plugar no Mac e dar Run de novo) e
permite no máximo 3 apps assim ao mesmo tempo.

Requisitos do Mac: **Xcode 26.4+** (exigência do Expo SDK 57 / React Native 0.86),
**Node 22.13+** e iPhone com **iOS 16.4+**.

```bash
git clone https://github.com/LeninneBP/battn-score.git
cd battn-score/battn-score
npm install
npx expo prebuild --platform ios
open ios/*.xcworkspace
```

O `prebuild` gera a pasta `ios/` nativa — ela está no `.gitignore` de propósito,
porque é sempre regenerável a partir do `app.json`.

No Xcode:

1. Settings → Accounts → adicione seu Apple ID (o de sempre serve).
2. Target **BATTN** → **Signing & Capabilities** → marque *Automatically manage
   signing* e escolha seu nome em **Team**.
3. Conecte o iPhone no cabo e selecione ele no lugar do simulador.
4. **Product → Scheme → Edit Scheme → Run → Build Configuration = `Release`.**
   Em `Debug` o app busca o JavaScript no servidor do Mac e não abre sozinho;
   em `Release` o bundle vai embutido e o app funciona offline na mesa.
5. `Cmd+R` para instalar.
6. No iPhone: Ajustes → Geral → VPN e Gerenciamento de Dispositivo → toque no seu
   Apple ID → **Confiar**.

Com assinatura de desenvolvedor paga dá para pular o Mac: `eas build -p ios` gera
o `.ipa` na nuvem, até rodando do Windows.

## O que já está pronto

- Turno normal / Começar Orbi (com quem chamou)
- Posta +1 e atalhos 3 / 4 / 5
- Orbi recusado (+2)
- Contador de **vazas** (até 3) por dupla
- Marcar quem ganhou / desistência (regra do X)
- ±1 no placar + **apagar último**
- **Soma** total no centro
- Badge **X · 19** e vitória aos 21
- **Revanche** com os mesmos nomes, com contador da série no canto de cada dupla
  (1–0, 1–1… para melhor de 3, de 5 etc.)
- Aba Critici rápida + regras completas + como jogar + créditos
- Salva a partida no aparelho (offline)
- Tela não apaga durante o jogo (keep-awake)
- Vibração leve nos toques (iPhone)

## Em casa: só aperfeiçoar

Ideias pra depois: ícone custom, nomes favoritos, modo paisagem “mesa”, compartilhar placar, build EAS instalável sem Expo Go.

## Nota

Homenagem ao Battn / Le Sappadine — app independente, sem afiliação oficial.
