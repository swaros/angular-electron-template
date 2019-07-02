import { ConfigRoute } from './ConfigRoute';
import {ConfigRuntime} from './ConfigRuntime';
export interface ConfigRoot {
    navigation: ConfigRoute[];
    electronNav: any[];
    runtime: ConfigRuntime;
}
