# Here's how I searched for Neovim:

I installed neovim with this obvious command:

```shell
sudo apt-get install neovim
```

I got a list of all binaries like this:

```shell
find ${PATH//:/ } -type f -executable -printf "%P\n" 
```

To the `find` command, I added `%h` to the `-printf "%P\nl"` argument. The `%h` added the path to the `%P` which is the filename. `\n` stands for new line.

```shell
find ${PATH//:/ } -type f -executable -printf "%h%P\n"
```
> I was able to find `/usr/bin/nvim`

