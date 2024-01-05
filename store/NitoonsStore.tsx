import { createStore, action, Action, createTypedHooks } from 'easy-peasy';

interface NitoonsStoreModel {
  completionNitoonsApi: string;
  setCompletionNitoonsApi: Action<NitoonsStoreModel, string>;
  activeChapter: string;
  setActiveChapter: Action<NitoonsStoreModel, string>;
  argument: {};
  setArgument: Action<NitoonsStoreModel, {}>;
  chapterContent: {};
  setChapterContent: Action<NitoonsStoreModel, {}>;
  contentSaved: boolean;
  setContentSaved: Action<NitoonsStoreModel, boolean>;
  showRegularEditor: boolean;
  setShowRegularEditor: Action<NitoonsStoreModel, boolean>;
  showScreenplayEditor: boolean;
  setShowScreenplayEditor: Action<NitoonsStoreModel, boolean>;
  scriptTitle: string;
  setScriptTitle: Action<NitoonsStoreModel, string>;
  wordCount: any;
  setWordCount: Action<NitoonsStoreModel, any>;
  characterCount: any;
  setCharacterCount: Action<NitoonsStoreModel, any>;
  isEditing: boolean;
  setIsEditing: Action<NitoonsStoreModel, boolean>;
  filmCut: boolean;
  setFilmCut: Action<NitoonsStoreModel, boolean>;

} 

export const NitoonsStore = createStore<NitoonsStoreModel>({
  completionNitoonsApi: '/api/completion',
  setCompletionNitoonsApi: action((state, payload) => {
    state.completionNitoonsApi = payload;
  }),
  activeChapter: 'empty',
  setActiveChapter: action((state, payload) => {
    state.activeChapter = payload;
  }),
  argument: {},
  setArgument: action((state, payload) => {
    state.argument = payload;
  }),
  chapterContent: {},
  setChapterContent: action((state, payload) => {
    state.chapterContent = payload;
  }),
  contentSaved: true,
  setContentSaved: action((state, payload) => {
    state.contentSaved = payload;
  }),
  showRegularEditor: false,
  setShowRegularEditor: action((state, payload) => {
    state.showRegularEditor = payload;
  }),
  showScreenplayEditor: true,
  setShowScreenplayEditor: action((state, payload) => {
    state.showScreenplayEditor = payload;
  }),
  scriptTitle:'',
  setScriptTitle: action((state, payload) => {
    state.scriptTitle = payload;
  }),
  wordCount: 0,
  setWordCount: action((state, payload) => {
    state.wordCount = payload;
  }),
  characterCount: 0,
  setCharacterCount: action((state, payload) => {
    state.characterCount = payload;
  }),
  isEditing: false,
  setIsEditing: action((state, payload) => {
    state.characterCount = payload;
  }),
  filmCut: false,
  setFilmCut: action((state, payload) => {
    state.filmCut = payload;
  }),

});

const typedHooks = createTypedHooks<NitoonsStoreModel>();

export const useNitoonsStoreState = typedHooks.useStoreState;
export const useNitoonsStoreActions = typedHooks.useStoreActions;
export const useNitoonsStoreDispatch = typedHooks.useStoreDispatch;
