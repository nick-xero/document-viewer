# document-viewer
Document viewer app to familiarize myself with the Backbone.js framework

## Backbone.js
This framework helps structure frontend code by separating html from and javascript.
Data object represented as Models can trigger and subscribe to change events that can trigger Views re-rendering.

![Model-View](https://backbonejs.org/docs/images/intro-model-view.svg)

### Models 
Models receive input from users handle and sync data with persistence layer (API) and emit "change" events.

### Views 
Views are UI components that listen to "change" events and re-render accordingly.

### Collections
Collections help deal with groups of related models and performing computations or aggregations on models.

https://backbonejs.org/#examples



Models are just data stores

views cna listen to events and invoke functions, they bind data to models

