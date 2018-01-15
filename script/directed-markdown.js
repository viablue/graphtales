
/*


begin --- choice, thought
choice --- yes, no, maybe 



- builds directed graph
- one chain per line 
- looks for "---" to split nodes 
- exactly one value on left
- one or more values on the right
- strips out spaces 
- uses syntax similar to markdown



// you write this in markdown:

start---first,choice
first---choice, second
second---third
choice---consequence
consequence---third


// the parser creates this version: 

{
  "nodes": [
    { "name": "start" },
    { "name": "first" },
    { "name": "choice" },
    { "name": "second" },
    { "name": "third" },
    { "name": "consequence" }
  ],
  "links": [
    { "source": 0, "target": 1 },
    { "source": 0, "target": 2 },
    { "source": 1, "target": 2 },
    { "source": 1, "target": 3 },
    { "source": 3, "target": 4 },
    { "source": 2, "target": 5 },
    { "source": 5, "target": 4 }
  ]
}

// ready to be fed into d3

wishlist:
- add extra data to nodes using [] syntax
- something like (node)[content]
- add weight or value to nodes? use black body curve 
- add weight to edges? maybe use opacity


[entirely up to you.](choice)
[going back for seconds?](thought)
[affirmative.](yes)
[negative.](no)
[not sure.](maybe)


// code for markup

button(onClick="drawGraph( dm.parse(document.querySelectorAll('textarea')[0].value) );") graph it



is---you,or
you---is,ain't
or---is
ain't---my
my---baby




*/

/**
 * DIRECTED MARKDOWN
 */

dmParse = function( source ) {

  var plan = {
    "nodes": [],
    "links": []
  },
    start = source.toString(),
    lines = start.split("\n"),
    temp = [],
    commas = /\s*,\s*/g,
    spaces = /\s/g;

    for (var i = 0; i < lines.length; i ++) {
      var current = lines[i].replace(spaces,""),
        divider = current.indexOf("---");

      if (divider === -1 || divider > 0 && current.length < 5 ) continue;
      // @todo this isn't exactly accurate

      var node = current.slice(0, divider),
        connections = current.slice(divider+3, current.length);
        
      if (connections.length < 1 || node.length < 1 ) continue;

      var connection = connections.split(commas);

      if (temp.indexOf(node) < 0) temp.push(node);

      for (var k = 0; k < connection.length; k++) {

        if (temp.indexOf(connection[k]) < 0) temp.push(connection[k]);  

        plan.links.push({
          "source": temp.indexOf(node),
          "target": temp.indexOf(connection[k])
        });

      }
      //debug: console.log(current);
    }

    for (var n = 0; n < temp.length; n++) {

      plan.nodes.push({
        "name": temp[n]
      });

    }

  return plan;
}


// test:
// processed version of example markdown:

var what = "start---first,choice\nfirst---choice, second\nsecond---third\nchoice---consequence\nconsequence---third"

var how = dmParse(what);
