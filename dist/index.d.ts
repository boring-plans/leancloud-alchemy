import * as AV from "leancloud-storage";
import { Columns } from './index.d';
declare const _default: {
    createRow: (table: string, columns: Columns) => Promise<AV.Object>;
    createRows: (table: string, rows: Columns[]) => Promise<(AV.Object | AV.Error)[]>;
    getRow: (table: string, id: string) => Promise<AV.Queriable> | Promise<null>;
    getRows: (table: string, ids: string[]) => Promise<AV.Queriable[]>;
    getRowsBy: (table: string, key: string | [string, string][], value: string) => Promise<AV.Queriable[]>;
    getSomeRows: (table: string, num: number, sortBy?: string | null, desc?: boolean) => Promise<AV.Queriable[]>;
    getRowsContainedIn: (table: string, key: string | [string, string[]][], values: string[]) => Promise<AV.Queriable[]>;
    updateRow: (table: string, id: string, columns: Columns) => Promise<AV.Object>;
    updateRows: (table: string, idColumnsList: [string, Columns][]) => void;
    deleteRow: (table: string, id: string) => void;
    deleteRows: (table: string, ids: string[]) => Promise<void>;
    deleteRowsBy: (table: string, key: string | [string, string][], value: string) => Promise<void>;
    deleteRowsContainedIn: (table: string, key: string | [string, string[]][], values: string[]) => Promise<void>;
    initAV: (appId: string, appKey: string) => Promise<unknown>;
};
export default _default;
