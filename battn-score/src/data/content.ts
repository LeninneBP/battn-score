export type RuleSection = {
  id: string;
  title: string;
  badge?: string;
  body: string[];
};

export type HowToStep = {
  title: string;
  text: string;
};

export const RULE_SECTIONS: RuleSection[] = [
  {
    id: 'obiettivo',
    title: 'Obiettivo',
    body: [
      'Due coppie. Vince chi raggiunge per primo 21 punti.',
      'I compagni siedono uno di fronte all’altro.',
      'Si usa un mazzo da briscola — idealmente Le Sappadine.',
    ],
  },
  {
    id: 'critici',
    title: 'I Critici (Krittn)',
    badge: 'CRITICI',
    body: [
      'Sono le 3 carte più forti del gioco, sempre — sopra a tutto.',
      '1) Barba — Re di Porcini (Rollate di Porcini / Port).',
      '2) Belli — 4 di Stelle Alpine.',
      '3) Spitz — 7 di Rastrelli.',
      'Chi gioca un Critico prende il piglio, indipendentemente dal Trumpf.',
    ],
  },
  {
    id: 'orbi',
    title: 'Orbi',
    badge: 'ORBI',
    body: [
      'Prima di distribuire le carte, una coppia può gridare “Orbi”.',
      'La posta base di quel turno diventa 3 (invece di 2).',
      'Sul segnapunti si mette un cerchio (○) dal lato di chi ha chiamato.',
      'Dopo aver visto le carte, la coppia avversaria può accettare o rifiutare.',
      'Se rifiuta: chi ha chiamato Orbi guadagna subito 2 punti.',
      'Se accetta: si gioca il turno da almeno 3 punti.',
    ],
  },
  {
    id: 'preparazione',
    title: 'Preparazione',
    body: [
      'Si sceglie il mazziere del primo turno.',
      'Il ruolo di mazziere passa a destra a ogni turno (senso antiorario).',
      'Ogni giocatore riceve 5 carte.',
    ],
  },
  {
    id: 'contrattazione',
    title: 'Contrattazione (Scheanara?)',
    body: [
      'Il mazziere e l’avversario alla sua destra chiedono: “Scheanara?” (“Più belle?”).',
      'Se sono d’accordo, cambiano le mani con 5 carte nuove (fino a 2 volte).',
      'Se non c’è accordo, tengono le carte e passano alla scelta.',
    ],
  },
  {
    id: 'scelta',
    title: 'Scelta: Schlòk e Trumpf',
    body: [
      'Il giocatore alla destra del mazziere sceglie il numero/figura (Schlòk) — la “carta buona”.',
      'Il mazziere sceglie il seme (Trumpf) del turno.',
      'Scala sintetica: Critici → Schlòk di Trumpf (“Il Buono”) → altri Schlòk → Trumpf → resto.',
    ],
  },
  {
    id: 'giocate',
    title: 'Giocate e pigli',
    body: [
      'Prima di iniziare, ciascuno guarda le carte del compagno.',
      'Ci sono 5 pigli. Chi ne fa 3 per primo vince il turno.',
      'Se esce Trumpf, gli altri devono rispondere di Trumpf se ce l’hanno — eccetto Critici, Il Buono e Schlòk.',
    ],
  },
  {
    id: 'posta',
    title: 'Posta e rialzo',
    body: [
      'Un turno normale vale 2 punti (o 3 dopo la X dei 19).',
      'Durante le giocate una coppia può alzare la posta di 1 in 1 (“Tre?”, “Quattro?”…).',
      'L’altra accetta (“Non vado!”) oppure abbandona e perde il turno alla posta già raggiunta.',
      'Esempio: posta a 3, l’avversario non accetta 4 → chi ha proposto prende 3.',
    ],
  },
  {
    id: 'diciannove',
    title: 'I 19 punti e la X',
    badge: 'X',
    body: [
      'Chi arriva per primo a 19 riceve una X sul segnapunti.',
      'Da quel momento tutti i turni valgono 3 di base.',
      'Se la coppia con la X abbandona un turno (carte brutte), perde solo 2 — non 3.',
    ],
  },
  {
    id: 'svista',
    title: 'Svista',
    body: [
      'Se una coppia prende per errore un piglio degli avversari, gli altri possono far finta di nulla.',
      'A fine turno, chi ha sbagliato perde automaticamente e l’altra prende la posta.',
    ],
  },
  {
    id: 'kritish',
    title: 'Kritish! (regola avanzata)',
    body: [
      'Solo il mazziere e quello alla sua destra guardano le carte in distribuzione/contrattazione.',
      'Gli altri vedono la mano solo dopo Schlòk e Trumpf fissati.',
      'Pensata per coppie rodate, dove conta anche il linguaggio del corpo.',
    ],
  },
  {
    id: 'semi',
    title: 'I semi delle Sappadine',
    body: [
      'Sci — inverno (Binter).',
      'Stelle Alpine — primavera (Lòngas).',
      'Rastrelli — estate (Summer).',
      'Porcini — autunno (Herbischt).',
      'Figure: Rollate (Re), Minatore/Camoscio (Cavallo), Holzhockar (Fante).',
    ],
  },
];

export const HOW_TO_STEPS: HowToStep[] = [
  {
    title: '1. Forma le coppie',
    text: 'Compagni uno di fronte all’altro. Scrivi i nomi nell’app e inizia la partita.',
  },
  {
    title: '2. Avvia il turno',
    text: 'Tocca “Turno normale” (posta 2) oppure “Inizia Orbi” (posta 3). La posta appare grande al centro.',
  },
  {
    title: '3. Alza la posta se vuoi',
    text: 'Usa “+1” oppure 3 / 4 / 5 quando il tavolo accetta. In qualsiasi momento si può abbandonare.',
  },
  {
    title: '4. Segna chi ha preso',
    text: 'Quando il turno è chiuso, tocca il pulsante della coppia vincente. “Annulla ultimo” toglie l’ultimo punteggio.',
  },
  {
    title: '5. Occhio alla X e alla meta',
    text: 'Due punti prima della meta compare la X. Poi la base diventa 3. Alla meta la partita finisce — rivincita con un tocco.',
  },
];
