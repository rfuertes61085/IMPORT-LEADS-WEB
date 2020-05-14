import { updateTagQuestionSuccess } from './../actions/tag-question.action';
import { loadTagsSuccess, addTagSuccess, deleteTagSuccess, updateTagSuccess } from '../actions/tags.actions';
import { ITag } from './../../tags.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { sortCreatedAt } from 'src/app/shared/util/sort';

export interface TagsState extends EntityState<ITag> {
}
export const adapter: EntityAdapter<ITag> = createEntityAdapter<ITag>({});
export const initialState: TagsState = adapter.getInitialState({

});
const tagsReducer = createReducer(
  initialState,
  on(updateTagQuestionSuccess, (state, action) => {
    /* update the question inside the tag object, so that we dont need to refresh the whole tag list */
    let tags = Object.values(state.entities);
    const changes = tags.find(t => t.questions.find(tg => tg.id === action.updated.id));
    changes.questions.forEach(question => {
      if (question.id === action.updated.id) {
        question = action.updated;
      }
    });
    return adapter.updateOne({ id: action.updated.id, changes }, state);
  }),
  on(updateTagSuccess, (state, action) => {
    return adapter.updateOne({ id: action.updated.id, changes: action.updated }, state)
  }),
  on(deleteTagSuccess, (state, action) => {
    return adapter.removeOne(action.deleted.id, state)
  }),
  on(addTagSuccess, (state, action) => {
    return adapter.addOne(action.created, state)
  }),
  on(loadTagsSuccess, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  })
);
export function TagsReducer(state: TagsState, action: Action) {
  return tagsReducer(state, action);
}
export const getTags = (state: TagsState) => {
  const contracts: ITag[] = state && state.entities ? Object.values(state.entities) : null;
  return contracts && contracts.sort((a: ITag, b: ITag) => sortCreatedAt(a, b));
};
