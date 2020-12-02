<template>
    <div class="home">
        <b-container>
            <b-alert dismissible fade :variant="alert.type" v-model="alert.show">{{ alert.message }}</b-alert>

            <b-row align-h="start">
                <b-col>

                    <b-card title="Por realizar" class="bg-secondary border-0">
                        <draggable v-model="incomplete" v-bind="{ group: 'todo' }">
                            <task-component v-for="task in incomplete" :key="task._id" :task="task"></task-component>
                        </draggable>

                        <b-card class="border-0 shadow-thin" v-if="adding">
                            <b-card-text>
                                <b-form-input placeholder="Descripción de la tarea" type="text" v-model="description"></b-form-input>
                            </b-card-text>
                            
                            <b-button variant="primary" class="border-0" @click="addTask">Agregar</b-button>
                            <b-button variant="outline-danger" class="border-0" @click="clear">Cancelar</b-button>
                        </b-card>
                        
                        <b-button variant="outline-primary" class="border-0" v-if="!adding" @click="adding = true">+ Agregar tarea</b-button>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card title="Completadas" class="bg-secondary border-0">
                        <draggable v-model="completed" v-bind="{ group: 'todo' }" @add="updateTask">
                            <task-component v-for="task in completed" :key="task._id" :task="task" @deleted="taskDeleted"></task-component>
                        </draggable>
                        
                        <h6 class="mt-3 text-muted" v-if="completed.length == 0">No hay tareas completadas</h6>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'

    import TaskComponent from '@/components/TaskComponent';

    export default {
        name: 'Home',
        
        components: {
            draggable, TaskComponent
        },
        
        data: () => ({
            adding: false,
            description: '',

            alert: {
                type: 'warning',
                message: '',
                show: 0,
            }
        }),

        computed: {
            completed: {
                get: (vm) => vm.$store.state.tasks.filter(task => task.completed),

                set() {}
            },
            incomplete: {
                get: (vm) => vm.$store.state.tasks.filter(task => !task.completed),

                set() {}
            }
        },

        methods: {
            addTask() {
                this.$http.post('https://api-nodejs-todolist.herokuapp.com/task', { description: this.description }).then(response => {
                    if (response.data.success) {
                        this.alert.show = 5;
                        this.alert.message = '¡Tarea creada!';
                        this.alert.type = 'success';
                        
                        this.description = '';

                        this.$store.commit('addTask', response.data.data);
                    }

                    this.adding = false;
                })
            },

            updateTask(ev) {
                var task = this.incomplete[ev.oldIndex];

                this.$store.commit('updateTask', { task, completed: true });
                
                this.$http.put('https://api-nodejs-todolist.herokuapp.com/task/' + task._id, { completed: true }).then(response => {
                    if (response.data.success) {
                        this.alert.show = 5;
                        this.alert.message = '¡Tarea completada!';
                        this.alert.type = 'success';
                    } else {
                        this.$store.commit('updateTask', { task, completed: false });
                    }
                })
            },

            taskDeleted() {
                this.alert.show = 5;
                this.alert.message = '¡Tarea eliminada!';
                this.alert.type = 'warning';
            },

            clear() {
                this.description = '';
                
                this.adding = false;
            },
        },
            
        mounted() {
            this.$http.get('https://api-nodejs-todolist.herokuapp.com/task').then(response => this.$store.commit('setTasks', response.data.data));
        }
    };
    </script>

<style type="text/css" media="screen">
    .card.bg-secondary {
        min-height: 80vh;
    }
</style>