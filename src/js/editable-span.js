Vue.component('editable-span', {
    props: ['value'],
    template: `
    <span class="editableSpan">
        <span v-show="!editing">{{value}}</span>
        <input v-show="editing" type="text" :value="value" @input='edit'>
        <button @click="editing = !editing" >edit</button>
    </span>    
     `,
     data: function() {
         return{
             editing: false
         }
     },
     methods: {
         edit(e){
            this.$emit('edit', e.target.value)
         }
     }
})