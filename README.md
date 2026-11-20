# 🩺 Grilă examen final – Medicină Clinică

Aplicație web statică (HTML + JS, fără dependențe) cu întrebări tip grilă în limba română, pe capitolele manualului *Kumar & Clark – Medicină Clinică*, ediția a 10-a. Fiecare întrebare are 4 variante, răspuns corect și explicație.

**Demo:** `https://<utilizator>.github.io/<repo>/`

## Funcționalități

- Alegere capitole și număr de întrebări (10 / 20 / toate)
- Amestecarea întrebărilor și a variantelor
- Feedback imediat, cu explicație
- Scor final, cel mai bun scor (salvat local) și listă de revizuit
- Mod luminos / întunecat automat, responsive

## Structură

```
.
├── src/index.html              # aplicația (întrebările sunt în const Q)
├── src/og-image.png            # miniatura (1200x630) pentru linkuri partajate
├── src/favicon.svg|.png|.ico   # iconița din tab
├── scripts/check.mjs           # validează întrebările și sintaxa
├── scripts/build.mjs           # generează dist/
├── .github/workflows/deploy.yml
├── package.json
└── LICENSE
```

## Rulare locală

```bash
npm start          # servește src/ local
npm run check      # validează întrebările
npm run build      # generează dist/
```

Poți deschide și direct `src/index.html` în browser.

## Publicare pe GitHub Pages

1. Creează un repository pe GitHub și urcă proiectul:
   ```bash
   git init
   git add .
   git commit -m "Prima versiune"
   git branch -M main
   git remote add origin https://github.com/<utilizator>/<repo>.git
   git push -u origin main
   ```
2. În repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. La fiecare push pe `main`, workflow-ul rulează validarea, build-ul și publică site-ul. Adresa apare în tab-ul **Actions** și în **Settings → Pages**.

## Cum adaugi întrebări

În `src/index.html`, adaugă o intrare în lista `Q`:

```js
["Capitol", "Întrebarea?", ["Varianta A", "Varianta B", "Varianta C", "Varianta D"], 1, "Explicația răspunsului."],
```

Al patrulea câmp este indexul variantei corecte (începe de la 0). `npm run check` verifică structura, iar pipeline-ul blochează publicarea dacă ceva este greșit.

## Avertisment

Întrebările sunt redactate pe baza subiectelor din capitolele manualului și au scop educațional. Verifică întotdeauna informațiile în sursa oficială și în ghidurile în vigoare. Nu înlocuiesc sfatul medical.

## Licență

MIT – vezi [LICENSE](LICENSE).
