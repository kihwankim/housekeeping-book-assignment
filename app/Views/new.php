<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  <meta charset="utf-8"/>
  <title>housekeeping data</title>
</head>
<body>

<div id="app">
<template>
  <div data-app>
    <v-card>
        <v-card-title>
            <h2>Add a New House Keeping Data</h2>
        </v-card-title>
        <v-card-text>
        <v-form class="px-3" 
            v-model="valid" 
            ref="form" 
            method="post" 
            action="../data/new">
            
            <v-text-field
                v-model="price"
                label="Price"
                required
                name="price"
                :rules="isPriceRule"
            ></v-text-field>
            <v-text-field
                v-model="description"
                label="Description"
                required
                name="description"
                :rules="inputRules"
            ></v-text-field>
            <v-row>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="date"
                        name="use_at"
                        label="Picker in menu"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="date"
                        no-title
                        scrollable
                        name="use_at"
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                    >
                        OK
                    </v-btn>
                    </v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
            <v-btn
            class="mr-4"
            type="submit"
            :disabled="!valid"
            >
            submit
            </v-btn>
        </v-form>
        </v-card-text>
    </v-card>
    </div>
</template>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
<script src="../../js/new.js"></script>
</body>
</html>