import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
  },
  mutations: {
    setTasks(state, tasks) {
        state.tasks = tasks;
    },
    addTask(state, task) {
        state.tasks.push(task)
    },
    updateTask(state, payload) {
        var index = state.tasks.indexOf(payload.task);

        state.tasks[index].completed = payload.completed;
    },
    deleteTask(state, task) {
        var index = state.tasks.indexOf(task);

        state.tasks.splice(index, 1);
    }
  },
  actions: {
  },
  modules: {
  }
})
