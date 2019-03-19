#!/usr/bin/expect 
set timeout -1
spawn gitbook build ./src dist/
expect "finished"

spawn ssh downing@192.168.100.192
expect {
    "Password" {send "123\r";}
    "yes/no" {send "yes\r";exp_continue}
}
expect "root" {send "sudo rm -r ~/Documents/gitbook\r"}
set timeout 2
expect {
    "Password" {send "123\r";}
    "yes/no" {send "yes\r";exp_continue}
}
send "exit\r" 

spawn scp -r ./dist/ downing@192.168.100.192:~/Documents/gitbook
expect {
    "Password" {send "123\r";}
    "yes/no" {send "yes\r";exp_continue}
}
send "exit\r" 
expect eof
exit

