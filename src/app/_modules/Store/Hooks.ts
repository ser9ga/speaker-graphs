import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/_modules/Store/Store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
