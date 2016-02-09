
**Question 1**
this.filteredPlaces() is a computed observable to refresh the initial list loaded in an observable array self.touristPlaces()
If the filter works (setting visibillity property to on/off) the view is not updated accordingly

SOLVED

**Question 2**
How to you link the filtered arrays with the list of markers (not part of the view model) ...

SOLVED

**Question 3**
I keep getting the following error despite handling the errors. Why is this happening?

```
Uncaught InvalidValueError: initMap is not a function
```

```
<script async
        defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMGV_Z0tYkriVBjO1KjJR646H4EzS2h7A&callback=initMap"
        onerror="mapError">
</script>
```

**Question 4**

What would be the step to use the following declaration

```
var ko = require('knockout');
var _ = require('lodash');
```

instead of explicitely doing

```
<script src="js/lib/lodash.js"></script>
<script src="js/lib/knockout-3.2.0.js"></script>
<script src="js/datas.js"></script>
<script src="js/app.js"></script>
```

I have already a package.json
a npm install would create the node_module

What else?