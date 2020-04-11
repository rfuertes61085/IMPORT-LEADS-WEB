import * as fromContract from '../reducers/contract.reducer';
import * as fromContractProducts from '../reducers/contract-products.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from 'src/app/store/app.reducer';

export interface ContractModuleState {
	contract: fromContract.ContractsState;
	contractProduct: fromContractProducts.ContractProductsState;
}

export const reducers: ActionReducerMap<ContractModuleState> = {
	contract: fromContract.ContractsReducer,
	contractProduct: fromContractProducts.ContractProductsReducer
};

export interface AppState extends fromRoot.AppState {
  contractsModule: ContractModuleState;
}

