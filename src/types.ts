export type ReportStatus='draft'|'final';
export type LifecyclePhase='idea'|'planningDesign'|'implementation'|'rolloutIntegration'|'operations';
export type ApplicationStage='local'|'dev'|'test'|'qa'|'prod';
export type TrafficLightStatus='green'|'yellow'|'red'|'gray';
export type Trend='improving'|'stable'|'worsening'|'unknown';
export type ResourceCategory='personnel'|'time'|'budget'|'knowHow'|'operationalStability';
export type NextStepStatus='open'|'inProgress'|'completed'|'blocked';
export interface Application { id:string; name:string; shortName:string; description?:string; businessOwner?:string; technicalOwner?:string; responsiblePerson?:string; team?:string; contact?:string; stage:ApplicationStage; tags:string[]; archived:boolean; createdAt:string; updatedAt:string; }
export interface LifecycleInformation { currentPhase:LifecyclePhase; nextPhase?:LifecyclePhase; progress?:number; explanation?:string; }
export interface Milestone { id:string; title:string; description?:string; targetDate?:string; progress:number; status:TrafficLightStatus; }
export interface ResourceAssessment { category:ResourceCategory; status:TrafficLightStatus; summary:string; details?:string; trend:Trend; }
export interface Risk { id:string; title:string; description?:string; status:TrafficLightStatus; owner?:string; isPrimary?:boolean; }
export interface Decision { id:string; title:string; description?:string; date?:string; }
export interface NextStep { id:string; title:string; description?:string; owner?:string; targetDate?:string; status:NextStepStatus; order:number; }
export interface StatusReport { id:string; applicationId:string; title?:string; reportDate:string; periodStart?:string; periodEnd?:string; author?:string; status:ReportStatus; lifecycle:LifecycleInformation; milestone?:Milestone; resources:ResourceAssessment[]; overallStatus:TrafficLightStatus; calculatedOverallStatus:TrafficLightStatus; risks:Risk[]; decisions:Decision[]; nextSteps:NextStep[]; managementSummary?:string; achievements?:string; significantChanges?:string; additionalNotes?:string; targetUntilNextReport?:string; createdAt:string; updatedAt:string; }
export interface AppSettings { view:'cards'|'table'; showArchived:boolean; sort:'name'|'updated'; author:string; theme:'light'|'dark'|'system'; }
export interface ExportPackage { format:'application-status-report-data'; schemaVersion:number; exportedAt:string; applicationVersion:string; settings:AppSettings; applications:Application[]; reports:StatusReport[]; }
export const SCHEMA_VERSION=1; export const APP_VERSION='1.0.0';
export const phases: {value:LifecyclePhase;label:string}[]=[{value:'idea',label:'Idee'},{value:'planningDesign',label:'Planung und Entwurf'},{value:'implementation',label:'Implementierung'},{value:'rolloutIntegration',label:'Rollout & Integration'},{value:'operations',label:'Betrieb'}];
export const stages: {value:ApplicationStage;label:string}[]=[{value:'local',label:'Lokal'},{value:'dev',label:'Dev'},{value:'test',label:'Test'},{value:'qa',label:'QA'},{value:'prod',label:'Prod'}];
export const resourceCategories: {value:ResourceCategory;label:string;icon:string}[]=[{value:'personnel',label:'Personal',icon:'👥'},{value:'time',label:'Zeit',icon:'◷'},{value:'budget',label:'Budget',icon:'€'},{value:'knowHow',label:'Know-how',icon:'✦'},{value:'operationalStability',label:'Betrieb',icon:'⚙'}];
export const statusLabels:Record<TrafficLightStatus,string>={green:'Im Plan',yellow:'Angespannt',red:'Kritisch',gray:'Nicht bewertet'};
export const trendLabels:Record<Trend,string>={improving:'Verbesserung',stable:'Stabil',worsening:'Verschlechterung',unknown:'Unbekannt'};
export const uid=()=>crypto.randomUUID(); export const now=()=>new Date().toISOString();
