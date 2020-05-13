import { isNil } from 'ramda';
import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { LoadingState } from '../../roles.types';
import { SiteModel, sitesQuery } from '../../store/sites';

const UseSites = (): [LoadingState, SiteModel[] | null] => {
	const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Loading);
	const [sites, setSites] = useState<SiteModel[] | null>(null);

	useEffect(() => {
		const destroyed$: Subject<boolean> = new Subject<boolean>();

		sitesQuery
			.selectAll()
			.pipe(
				takeUntil(destroyed$),
				filter(sitesObject => !isNil(sitesObject)),
				distinctUntilChanged()
			)
			.subscribe(sitesObject => {
				if (sitesObject) {
					setSites(sitesObject);
				}
			});

		sitesQuery.isFetching$.pipe(takeUntil(destroyed$)).subscribe(loading => {
			if (loading) {
				return setLoadingState(LoadingState.Loading);
			}

			setLoadingState(LoadingState.Loaded);
		});

		sitesQuery
			.selectError()
			.pipe(
				takeUntil(destroyed$),
				filter(error => !isNil(error)),
				distinctUntilChanged()
			)
			.subscribe(() => setLoadingState(LoadingState.Error));

		return () => {
			destroyed$.next(true);
			destroyed$.complete();
		};
	}, []);

	return [loadingState, sites];
};

export default UseSites;
