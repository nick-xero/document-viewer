
const File = Backbone.Model.extend({
    defaults:{
        username:'',
        filename:'',
        filetype:'',
    }
})

const Files = Backbone.Collection.extend({
    url:'http://localhost:3011/files'
})

// const FileA = new File({username:'nick',filename:'receipt.txt',filetype:'txt'})
// const FileB = new File({username:'nick',filename:'bill.jpg',filetype:'jpg'})

const defaultCollection = new Files([])

const FileView = Backbone.View.extend({
    model:new File(),
    tagName:'tr',
    initialize:function(){this.template=_.template($('.files-list-template').html())},
    events:{
        'click .edit-file':'edit',
        'click .update-file':'update',
        'click .cancel-update':'cancel',
        'click .delete-file':'remove'
    },
    
    remove:function(e){
        this.model.destroy();
    },
    update:function(e){
        this.model.set('username',$('.username-update').val());
        this.model.set('filename',$('.filename-update').val());
        this.model.set('filetype',$('.filetype-update').val());
    },
    edit: function(){
        this.$('.edit-file').hide();
        this.$('.delete-file').hide()
        this.$('.update-file').show()
        this.$('.cancel-update').show()

        const username = this.$('.username').html();
        const filename = this.$('.filename').html();
        const filetype = this.$('.filetype').html();

        this.$('.username').html('<input type="text" class="form-control username-update" value="'+username+'"/>');
        this.$('.filename').html('<input type="text" class="form-control filename-update" value="'+filename+'"/>');
        this.$('.filetype').html('<input type="text" class="form-control filetype-update" value="'+filetype+'"/>');
    },
    cancel:function(){
        this.$('.username').html(this.model.get('username'));
        this.$('.filename').html(this.model.get('filename'));
        this.$('.filetype').html(this.model.get('filetype'));

        this.$('.edit-file').show()
        this.$('.delete-file').show()
        this.$('.update-file').hide()
        this.$('.cancel-update').hide()

    },
    render:function(){
        this.$el.html(this.template(this.model.toJSON()))
        return this;
    }
})

const FilesView = Backbone.View.extend({
    model:defaultCollection,
    el:$('.files-list'),
    initialize:function(){
        const self = this
        this.model.on('add',this.render,this)
        this.model.on('remove',this.render,this)
        this.model.on('change',function(){
            setTimeout(function(){
                self.render();
            },100)
        },this)
        this.model.fetch({
            success: function(response){
            console.log("🚀 ~ file: scripts.js ~ line 83 ~ response", response)
                _.each(response.toJSON(), function(item){
                    console.log('succesfully got file with id',item._id)
                })
            },
            error: function(err){
            console.log("🚀 ~ file: scripts.js ~ line 88 ~ error", error)
            }
        })
    },
    render:function(){
        const self= this;
        this.$el.html('');
        _.each(this.model.toArray(),function(file){
            self.$el.append((new FileView({model:file})).render().$el);
        })
        return this;

    }
})
const filesView = new FilesView()

$(document).ready(function(){
    $('.add-file').on('click',function(){
        const file = new File({
            username: $('.username-input').val(),
            filename: $('.filename-input').val(),
            filetype: $('.filetype-input').val(),
        })
        $('.username-input').val('');
        $('.filename-input').val('');
        $('.filetype-input').val('');

        defaultCollection.add(file)
        file.save(null,{
            success: function(response){
                console.log('success',response.toJSON()._id)
            },
            error: function(){
                console.log('failed to save file')
            }
        })
    })

})