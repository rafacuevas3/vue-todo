<template>
    <b-card class="mb-2 border-0 shadow-thin">
        <b-card-text>
            <b-button pill variant="outline-danger" size="sm" @click="deleteTask(task)" class="mr-3" :disabled="loading">
                <b-icon-trash v-if="!loading"></b-icon-trash>
                
                <b-spinner small v-else></b-spinner>
            </b-button>
            

            {{ task.description }}
        </b-card-text>
    </b-card>
</template>

<script type="text/javascript">
    export default {
        props: {
            task: {
                type: Object,
                default: null,
                required: true
            }
        },

        data: () => ({
            loading: false
        }),

        methods: {
            deleteTask(task) {
                this.loading = true;

                this.$http.delete('https://api-nodejs-todolist.herokuapp.com/task/' + task._id).then(response => {
                    if (response.data.success) {
                        this.$emit('deleted');
                        
                        this.loading = true;

                        this.$store.commit('deleteTask', task);
                    }
                })
            },
        }
    };
</script>