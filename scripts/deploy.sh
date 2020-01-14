#!/usr/bin/expect

# . ./scripts/loadenv.sh
set HOST <HOST>
set SSH_PORT <PORT>
set REMOTE_USER root
set REMOTE_PATH /static/px

puts "<< sync info >>"
puts "HOST: $HOST"
puts "SSH_PORT: $SSH_PORT "
puts "REMOTE_USER: $REMOTE_USER "
puts "REMOTE_PATH: $REMOTE_PATH "
puts ""

spawn time rsync -rvzh --stats --delete -e "ssh -p $SSH_PORT" dist/ $REMOTE_USER@$HOST:$REMOTE_PATH
expect "root@"
send "<pwd>\n"
interact
