// var abc = ['a', 'b', 'a', 'c', 'b']
// var b = abc.reduce( (alldata, data) => {
//     if (data in alldata) {alldata[data]++;}
//     else {alldata[data] = 1}
//     return alldata;
// }, [])
// var d = []
// for (var a in b) {
//     for(i=0; i<b[a]; i++) {d.push(a)}
// }
var old_data = {'b':1}
var new_data = {'a':2, 'b':1, 'c':1}
var new_map = new Map(Object.entries(new_data))
var old_map = new Map(Object.entries(old_data))
if (new_map.size >= old_map.size) {var big_map = new_map; var small_map = old_map;}
else {var big_map = old_map; var small_map = new_map; indicator = false}
var change_map = new Map();
small_map.forEach((value, key, array) => {
    
    big_map.forEach((value1, key1, array1) =>{
        if (array.has(key1)) {change_map.set(key1, ( value1 - array.get(key1)))}
        else if (array1.has(key) == false) {change_map.set(key, -value);}
        else {change_map.set(key1, value1 );}
    })
})
console.log(change_map)
var sample = Array.from(change_map)
sample.forEach(data => {console.log(data[1])})

// if (indicator) {
//     console.log('the number of new menu is increased');
// }
// else {console.log('the number of new menu is decreased');
//     change_map.forEach((value,key) => {change_map.set(key, -value)})
// }
// console.log(change_map)
// var change_obj = []
// change_map.forEach((value, key) => {change_obj.push({'key': key, 'num':value})})
// console.log(change_obj)
// var new_obj = [ 
//     { key: 'a', num: '3' },
//     { key: 'b', num: '90' },
//     { key: 'c', num: '3' },
//     { key: 'd', num: '7' },
//     { key: 'f', num: '10' },
//     { key: 'e', num: '23' } 
// ];
// for(i=0; i<change_obj.length; i++){
//     var num = Number(new_obj[i].num);
//     num += change_obj[i].num;
//     new_obj[i].num = num.toString();
// }
// console.log(new_obj)
