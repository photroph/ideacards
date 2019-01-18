<?php
// ini_set('display_errors', 1);

session_start();
$chosen_words = $_SESSION['chosen_words'];
unset($_SESSION['chosen_words']);
$loaded_csv = fopen('./wordbank.csv','r');
$word_list = fgetcsv($loaded_csv);
fclose($loaded_csv);

?>
<!DOCTYPE html>
<html>
<head>
    <title>idea cards</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./style.css">
</head>

<body>
    <h1 class="title">idea cards</h1>
    <div class="flexbox">

        <div class="add_area">
            <p><b>Words can added from here</b></p>
            <form action="./register.php" method="post" name="register_word">
                <input type="text" name="word_to_register" required>
                <input type="button" value="add this word" id="register_word_btn">
            </form>
            
            <ul>
            <?php
            $i = 0;
            foreach ($word_list as $word) {
                echo '<li class="word_in_csv"><span>'.$word.'&nbsp;<input type="hidden" name="word_to_delete" value="'.$word.'"></span></li>';
                $i++;
            }
            $max_to_choose = $i;
            ?>
            <form action="./delete_word_csv.php" method="post" name="del">
                <input type="hidden" value="" name="word_to_delete" id="word_in_csv_delete">
            </form>
            </ul>
        </div>

        <div class="triangle01"></div>

        <div>
            <p><b>保存したワードの組が以下に表示されます.</b></p>
            <p>(ブラウザを閉じると消去されます)</p>
            <div id="stash_area" class="border_area"></div>
            <div id="delete_stashed_word">
                <p>Drop here to delete word</p>
            </div>
        </div>

        <div class="disp_area">
            <p><b>Randomly chosen words shown below</b></p>
            <p>(number of words to make pair can be changed)</p>
            <form action="./chose_word.php" method="post" class="word_choose_area">
            <input type="number" name="num_to_choose" value=2 min=2 max=<?php echo $max_to_choose; ?>>
                <input type="submit" value="get words!">
            </form>
            <div id="displayed_words">
            <?php
            if($chosen_words){
                echo '<p>Drag on the left area to Save</p><p id="chosen_words">';
                $i = 0;
                foreach ($chosen_words as $chosen_word) {
                    echo '<span>'.$chosen_word.'</span>';
                    $i++;
                }
                echo '</p>';
            }
            ?>
            </div>
        </div>

    </div>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js"></script>
    <script src="./index.js"></script>
</body>
</html>
