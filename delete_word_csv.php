<?php
ini_set('display_errors', 1);

$word_to_delete = $_POST['word_to_delete'];

// echo 'delete '.$word_to_delete.'<br>';

$loaded_csv = fopen('./wordbank.csv','r');
$word_list = fgetcsv($loaded_csv);
fclose($loaded_csv);

$key_to_delete = array_search($word_to_delete, $word_list);
echo $key_to_delete.'<br>';
if(is_numeric($key_to_delete)){
    // var_dump($word_list);
    unset($word_list[$key_to_delete]);
    // echo '<br>';
    // var_dump($word_list);
    $renew_csv = fopen('./wordbank.csv','w');
    $i =0;
    foreach($word_list as $word){
        if($i == 0){
            fwrite($renew_csv, '"'.$word.'"');
        }else{
            fwrite($renew_csv, ',"'.$word.'"');
        }
        $i++;
    }
    fclose($renew_csv);
}

header('Location: ./');
exit();
?>
