<template>
    <div class="container ">
        <h2>Comment Section:</h2>
        <div class="container p-0 m-0">
            <div class="row p-0 m-0">

                <!-- for user image -->
                <div class="col-1 p-0 m-0 text-center">
                    <img src="./../../../public/image.png" alt="" width="50px" height="50px" class="me-2">
                </div>

                <!-- for textarea, and submit button -->
                 <div class="col p-0 m-0">
                    <!-- for textarea -->
                    <div class="row p-0 m-0">
                        <textarea
                        rows="1"
                        style="overflow:hidden; resize: none; width: 100%; font-size: large; height: 50px;"
                        oninput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
                        placeholder="tell us your watch experience...."
                        class="form-control w-100 m-0"
                        ></textarea>
                    </div>

                    <!-- for btn -->
                    <div class="row-cols-5 p-0 m-0 text-end">
                    <button class="btn btn-primary m-0 mt-3">Hit👊</button>
                    </div>

                 </div>


            </div>

        </div>
    </div>
</template>

<script setup>
</script>

