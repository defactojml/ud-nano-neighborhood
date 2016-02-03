
**Question 1**
this.filteredPlaces() is a computed observable to refresh the initial list loaded in an observable array self.touristPlaces()
If the filter works (setting visibillity property to on/off) the view is not updated accordingly
SOLVED

**Question 2**
How to you link the updated arrays with the list of markers (not part of the view model) ...

**Question 3**
I keep getting the following error despite handling the errors. Why is this happening?


'''
Uncaught InvalidValueError: initMap is not a function
Uncaught TypeError: Cannot read property 'setMap' of undefined
'''

'''
<script async
        defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMGV_Z0tYkriVBjO1KjJR646H4EzS2h7A&callback=initMap"
        onerror="mapError">
</script>
'''