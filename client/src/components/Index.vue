<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="container">
    <a class="button" v-on:click="recalc++">
      Refresh ({{ recalc }})
    </a>
    <table id="entryTable" class="table">
      <thead>
      <tr>
        <th v-on:click="sortBy('title')"><a>
          <span class="icon"><i v-bind:class="sortIcon('title')"></i></span> Title
        </a></th>
        <th v-on:click="sortBy('updatedDate')"><a>
          <span class="icon"><i v-bind:class="sortIcon('updatedDate')"></i></span> Updated at
        </a></th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="entry in entries">
        <td>#{{ entry.id }} {{ entry.title }}</td>
        <td>{{ entry.updatedDate }}</td>
        <td><span v-on:click="deleteEntry(entry.id)" class="icon">
          <i class="fa fa-trash-o"></i>
        </span></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Dexie from 'dexie'

  const db = new Dexie('hours_database')
  db.version(1).stores({
    log_entries: '++id,startDate,finishDate,updatedDate,title'
  })

  window.addEntry = function (title) {
    db.log_entries.put({
      title: title,
      startDate: new Date(),
      finishDate: null,
      updatedDate: new Date()
    }).then(function () {
      console.log('entry saved')
    }).catch(function (error) {
      console.error(error)
    })
  }

  window.debugdb = db

  export default {
    name: 'index',
    data () {
      return {
        orderBy: 'updatedDate',
        reverse: false,
        page: 1,
        limit: 10,
        recalc: 0
      }
    },
    methods: {
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
          console.log('sorted by ' + property)
          return this.reverse
            ? 'fa fa-sort-alpha-desc'
            : 'fa fa-sort-alpha-asc'
        }
      },
      deleteEntry (id) {
        db.log_entries.where('id').equals(id).delete().then(() => this.recalc++)
      }
    },
    asyncComputed: {
      entries () {
        // Force recalc by making depend on recalc
        if (this.recalc < 0) {
          this.recalc = 0
        }
        let query = db.log_entries
          .orderBy(this.orderBy)
          .limit(this.limit)
          .offset(this.limit * (this.page - 1))
        if (this.reverse) query.reverse()

        return query
          .toArray()
          .then(function (entries) {
            console.log(entries)
            return entries
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #entryTable thead th {
    cursor: pointer;
  }
  #entryTable thead th:hover {
    background-color: #f5f5f5;
  }
</style>
