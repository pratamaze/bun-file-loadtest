#!/bin/bash

# Fungsi untuk membuat file dengan ukuran tertentu dalam KB
create_file() {
    filename=$1
    size_kb=$2
    base_text="This is a sample line of text to fill the file.\n"

    # Hitung berapa banyak pengulangan yang dibutuhkan
    repeat=$(( (size_kb * 1024) / ${#base_text} ))

    # Buat file dengan isi yang diulang
    yes "$base_text" | head -n $repeat > "$filename"

    # Tampilkan ukuran file untuk verifikasi
    echo "$filename created - size:"
    ls -lh "$filename"
}

# Buat file 10KB
create_file "small.txt" 10

# Buat file 100KB
create_file "medium.txt" 100

# Buat file 1000KB (1MB)
create_file "large.txt" 1000
