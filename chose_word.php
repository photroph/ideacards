<?php
ini_set('display_errors', 1);

$loaded_csv = fopen('./wordbank.csv','r');
$word_list = fgetcsv($loaded_csv);
fclose($loaded_csv);

// var_dump($word_list);
$num_choose = $_POST['num_to_choose'];

$rand_keys = array_rand($word_list, $num_choose);

// for ($i = 0; $i < $num_choose; $i++){
//     echo $word_list[$rand_keys[0]].'<br>';
//     echo $word_list[$rand_keys[1]].'<br>';
// }

$chosen_words = [];
for ($i = 0; $i < $num_choose; $i++){
    array_push($chosen_words, $word_list[$rand_keys[$i]]);
}

session_start();
$_SESSION['chosen_words'] = $chosen_words;
header('Location: ./');
exit();
?>
