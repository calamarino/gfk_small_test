#!/bin/bash
FIRST=$(curl -s https://cdn.gfkdaphne.com/tests/async.php?a=1);
FIRST="$FIRST "
SECOND=$(curl -s https://cdn.gfkdaphne.com/tests/async.php?a=2);
echo $FIRST$SECOND;
