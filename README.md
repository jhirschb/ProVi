# ProVi – Statusreport-Webanwendung

Eine statisch deploybare, clientseitige SPA zur Verwaltung von Softwareanwendungen und Statusreports. Alle Daten bleiben im Browser; es gibt kein Backend, keine Anmeldung und keine externen Dienste.

## Start, Build und Tests

```bash
npm install
npm run dev       # lokale Entwicklung
npm run build     # statischer Build in dist/
npm test          # Vitest-Fachlogiktests
npm run preview   # Build lokal prüfen
```

Der Inhalt von `dist/` kann auf beliebigem statischem Hosting bereitgestellt werden. Die App startet bei leerem Speicher mit Demodaten für drei Anwendungen und einem Report.

## Architektur

`src/types.ts` enthält das strikt typisierte Fachmodell und zentrale Enum-Werte. `src/domain.ts` kapselt Berechnung, Validierung, Exportformat und Vergleich. `src/storage.ts` stellt `StorageRepository` bereit; die erste Version nutzt dahinter `localStorage`, damit sie ohne zusätzliche Infrastruktur funktioniert. Die Schnittstelle ist der Austauschpunkt für eine spätere IndexedDB-Implementierung. `src/main.tsx` enthält die React-Komponenten für Übersicht, Reporteditor, Historie, Statuskarte sowie Import/Export. Die Statuskarte ist als eigenständige `StatusCard`-Komponente wiederverwendbar und besitzt ein Drucklayout in CSS.

## Datenformat

Exportdateien sind UTF-8-JSON mit `format: "application-status-report-data"`, `schemaVersion: 1`, `exportedAt`, `applicationVersion`, `settings`, `applications` und `reports`. Report-IDs referenzieren `applicationId`. Beim Import werden Format, Version, doppelte IDs und Reportreferenzen vor der Übernahme geprüft. Eine fehlgeschlagene Validierung verändert den bestehenden Speicher nicht.

## Bekannte Einschränkungen der Initialversion

- Persistenz nutzt `localStorage` statt IndexedDB; dadurch gelten Browser-Quota- und Größenlimits.
- Import ist als Zusammenführen mit Bestätigungsdialog umgesetzt; eine detaillierte Konfliktmatrix und „als Kopie anlegen“ folgen in einer nächsten Iteration.
- Risiken, Entscheidungen und optionale Reportfelder sind im Modell vorhanden, im ersten Editor aber noch nicht vollständig ausgebaut.
- PNG/PDF-Export erfolgt über die Browser-Druckfunktion (A4 quer); ein separater PNG-Exporter ist nicht enthalten.
- Offline-Nutzung nach initialem Laden hängt beim statischen Hosting vom Browser-Cache ab; ein Service Worker ist noch nicht enthalten.
