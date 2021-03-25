function binarySearch(arr, l, r, x) {
    if (r >= l) {
        var mid = l + (r - l) / 2;
        mid = Math.floor(mid)
        if (arr[mid].name.substr(0, x.length) == x) {
            return mid;
        }
        if (arr[mid].name.substr(0, x.length) > x) {
            return binarySearch(arr, l, mid - 1, x);
        }
        return binarySearch(arr, mid + 1, r, x);
    }
    return -1;
}

Utilities = {
    getEmail: function(req) {
        if (req.isAuthenticated()) {
            return req.user.email;
        } else {
            return "";
        }
    },
    getSuggestions: function(arr, x) {
        var index = binarySearch(arr, 0, arr.length-1, x)
        var temp = []
        if(index !== -1){
            var i = 1
            while (i < index && arr[index-i].name.substr(0, x.length) == x) {
                i = i*2
            }
            if(i > index){
                i = 0
            }
            i = index-i
            for(var j=i;j<=index;j++){
                if(arr[j].name.substr(0, x.length) == x){
                    i = j
                    break
                }
            }
            for(var j=0;j<5 && i+j<arr.length ;j++){
                if(arr[i+j].name.substr(0, x.length) == x){
                    temp.push(arr[i+j])
                }
            }
            return temp
        } else {
            return []
        }
    },
    getChildren: function(locations, a1, a2){
        if(a1 === '') return locations.admin
        var temp = [];
        for(var key in locations.admin){
            if(locations.admin[key].name === a1){
                for(var key2 in locations.admin[key].children){
                    if(locations.admin[key].children[key2].name === a2){
                        return locations.admin[key].children[key2].children;
                    }
                    temp.push(locations.admin[key].children[key2].name);
                }
                return temp;
            }
        }
        return 'Not found';
    },
    getLocation: function(locations, string){
        var arr = string.split("-")
        if(typeof arr[0] === 'undefined') return ''
        if(typeof arr[1] === 'undefined') return locations[arr[0]].name
        if(typeof arr[2] === 'undefined') return locations[arr[0]].children[arr[1]].name
        return locations[arr[0]].children[arr[1]].children[arr[2]]
    }
};

module.exports = Utilities;
