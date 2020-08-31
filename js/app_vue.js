new Vue({
    el: '#app',
    data: {
        newText: '',
        list: [],
        hasError: false,
        errorMsg: '何も入力されていません',
        searchWord: ''
    },
    computed: {
        filterList: function(){
            var list = [];
            for(var i in this.list){
                var item = this.list[i];
                if(item.text.indexOf(this.searchWord) !== -1){
                    list.push(item);
                }
            }
            return list;
        }
    },
    methods: {
        addToList: function(event, value){
            event.preventDefault();
            var text = this.newText;

            if(!text){
                this.hasError = true;
                return
            } else {
                this.hasError = false;
                this.list.push({
                    id: new Date().getTime().toString(16) + Math.floor(1000 * Math.random()).toString(16),
                    text: text,
                    checked: false,
                    editMode: false,
                });
                this.newText = '';
            }
        },
        doEditMode: function(item){
            item.editMode = true;
        },
        closeEditMode: function(item){
            item.editMode = false;
        },
        remove: function(item){
            var index = this.list.indexOf(item);
            this.list.splice(index, 1);
        },
        doChange: function(item){
            item.checked = item.checked ? false : true;
        }
    }


});