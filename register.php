<?php
ini_set('display_errors', 1);

$word_to_register = $_POST['word_to_register'];

// echo ($word_to_register.'<br>');

$loaded_csv = fopen('./wordbank.csv','a');
$word_list = fgetcsv($loaded_csv);
$word_to_register = ',"'.$word_to_register.'"';

fwrite($loaded_csv, $word_to_register);

fclose($loaded_csv);

// var_dump($word_list);

header('Location: ./');
exit();
?>
