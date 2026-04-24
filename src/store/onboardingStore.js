import { create } from 'zustand'

export const useOnboardingStore = create((set, get) => ({
  answers: {},  // { [step]: value }
  loaded: false,

  setAnswer: (step, value) =>
    set(state => ({ answers: { ...state.answers, [step]: value } })),

  loadAnswers: (rows) => {
    const answers = {}
    rows.forEach(({ step, answer }) => { answers[step] = answer })
    set({ answers, loaded: true })
  },

  getAnswer: (step) => get().answers[step] ?? null,
}))
