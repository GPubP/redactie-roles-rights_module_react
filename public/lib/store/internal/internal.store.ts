import { Store, StoreConfig } from '@datorama/akita';

import { InternalState } from './internal.model';

export const createInitialInternalState = (): InternalState => ({
	user: null,
});

@StoreConfig({ name: 'users' })
export class InternalStore extends Store<InternalState> {
	constructor() {
		super(createInitialInternalState());
	}
}

export const internalStore = new InternalStore();
