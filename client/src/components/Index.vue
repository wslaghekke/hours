<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container">
    <section class="section">
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input id="title-input" type="text" class="input" placeholder="Title" v-model="title" v-on:keyup.enter="addEntry(title)">
        </p>
        <p class="control">
          <a class="button is-info" v-on:click="addEntry(title)">Save</a>
        </p>
      </div>
      <table id="entryTable" class="table">
        <thead>
        <tr>
          <th v-on:click="sortBy('title')">
            <span class="icon"><i v-bind:class="sortIcon('title')"></i></span> Title
          </th>
          <th v-on:click="sortBy('updatedDate')">
            <span class="icon"><i v-bind:class="sortIcon('updatedDate')"></i></span> Updated at
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entry in entries">
          <td>{{ entry.title }}</td>
          <td>{{ entry.created_at }}</td>
          <td>
            <span v-on:click="deleteEntry(entry)" class="icon is-pulled-right"><i class="fa fa-trash-o"></i></span>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        title: '',
        orderBy: 'updated_at',
        reverse: false,
        currentPage: 1,
        resultsPerPage: 10
      }
    },
    methods: {
      addEntry () {
        if (this.title.length < 1) {
          return
        }
        let entry = {
          title: this.title,
          created_at: new Date()
        }
        this.$pouch.post('entries', entry)
        this.title = ''
      },
      deleteEntry (entry) {
        this.$pouch.remove('entries', entry)
      },
      sortBy (property) {
        if (this.orderBy === property) {
          this.reverse = !this.reverse
        } else {
          this.reverse = false
          this.orderBy = property
        }
      },
      sortIcon (property) {
        if (this.orderBy === property) {
          return this.reverse ? 'fa fa-sort-alpha-desc' : 'fa fa-sort-alpha-asc'
        }
      }
    },
    pouch: {
      entries: function () {
        return {
          selector: {title: {$exists: true}},
          sort: [{[this.orderBy]: this.reverse ? 'asc' : 'desc'}],
          database: 'entries',
          limit: this.resultsPerPage,
          skip: this.resultsPerPage * (this.currentPage - 1)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #entryTable thead th {
    cursor: pointer;
  }
  #entryTable thead th:hover {
    background-color: #f5f5f5;
  }
</style>
